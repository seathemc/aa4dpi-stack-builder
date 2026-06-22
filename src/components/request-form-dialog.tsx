"use client";

import * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const countries = [
  "Ghana",
  "Kenya",
  "Nigeria",
  "Rwanda",
  "South Africa",
  "Egypt",
  "Senegal",
  "Morocco",
  "Tanzania",
  "Uganda",
  "Other",
];

const organisationTypes = [
  "Government",
  "UNDP Country Office",
  "Civil society",
  "Private sector",
  "Donor or development finance",
  "Multilateral or UN",
  "Academia or research",
  "Other",
];

const interestOptions = [
  "Country DPI support",
  "Use cases",
  "Identity, payments, or data exchange",
  "Safeguards and governance",
  "Financing and partnerships",
  "Events and learning",
];

const useCaseOptions = [
  "Agriculture",
  "Financial inclusion",
  "Social protection",
  "Health",
  "Education",
  "Trade",
  "Other",
];

const maturityOptions = [
  "Not started",
  "Being explored",
  "In design or build",
  "Piloting",
  "Operating at national scale",
  "Unsure",
];

function Field({
  label,
  name,
  required,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="grid gap-2 text-sm font-medium">
      {label}
      <Input
        name={name}
        required={required}
        type={type}
        placeholder={placeholder}
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  required,
  options,
  placeholder = "Select one",
}: {
  label: string;
  name: string;
  required?: boolean;
  options: string[];
  placeholder?: string;
}) {
  return (
    <label className="grid gap-2 text-sm font-medium">
      {label}
      <Select name={name} required={required}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </label>
  );
}

function CheckboxList({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: string[];
}) {
  return (
    <fieldset className="grid gap-2">
      <legend className="text-sm font-medium">{label}</legend>
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((option) => (
          <label
            key={option}
            className="flex items-start gap-2 rounded-md border bg-background px-3 py-2 text-sm leading-5"
          >
            <input
              type="checkbox"
              name={name}
              value={option}
              className="mt-0.5 size-4 rounded border-input accent-primary"
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function TextArea({
  label,
  name,
  required,
  placeholder,
}: {
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="grid gap-2 text-sm font-medium">
      {label}
      <textarea
        name={name}
        required={required}
        placeholder={placeholder}
        className="min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
      />
    </label>
  );
}

function readForm(form: HTMLFormElement, type: string) {
  const formData = new FormData(form);
  const fields: Record<string, string | string[]> = { type };

  for (const key of formData.keys()) {
    if (fields[key]) continue;
    const values = formData.getAll(key).map(String).filter(Boolean);
    fields[key] = values.length > 1 ? values : values[0] ?? "";
  }

  return fields;
}

export function RequestFormDialog({
  children,
  defaultType = "interest",
}: {
  children: React.ReactNode;
  defaultType?: "interest" | "country";
}) {
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");
  const [message, setMessage] = React.useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>, type: string) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");

    const fields = readForm(event.currentTarget, type);
    const response = await fetch("/api/engage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, fields }),
    });

    if (response.ok) {
      setStatus("sent");
      setMessage("Thank you. Your request has been sent to the AA4DPI team.");
      event.currentTarget.reset();
      return;
    }

    const data = await response.json().catch(() => null);
    setStatus("error");
    setMessage(data?.error ?? "Something went wrong. Please try again.");
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Work with AA4DPI</DialogTitle>
          <DialogDescription>
            Use the short form for updates, partnerships, or events. Use country
            support when a government team or UNDP Country Office wants to
            discuss AA4DPI help.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue={defaultType} className="gap-4">
          <TabsList className="grid h-auto grid-cols-2">
            <TabsTrigger value="interest">Ecosystem interest</TabsTrigger>
            <TabsTrigger value="country">Country support</TabsTrigger>
          </TabsList>

          <TabsContent value="interest" className="m-0">
            <form
              onSubmit={(event) => submit(event, "ecosystem interest")}
              className="grid gap-4"
            >
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Name" name="name" required />
                <Field label="Email" name="email" type="email" required />
                <Field label="Organisation" name="organisation" required />
                <SelectField
                  label="Organisation type"
                  name="organisationType"
                  required
                  options={organisationTypes}
                />
                <SelectField
                  label="Country"
                  name="country"
                  required
                  options={countries}
                />
                <Field label="Role" name="role" placeholder="Optional" />
              </div>
              <CheckboxList
                label="What are you interested in?"
                name="interest"
                options={interestOptions}
              />
              <TextArea
                label="What would you like to do with AA4DPI?"
                name="note"
                placeholder="Share what you want to learn, contribute, or help shape."
              />
              <label className="flex items-start gap-2 text-sm leading-6 text-muted-foreground">
                <input
                  required
                  type="checkbox"
                  name="consent"
                  value="yes"
                  className="mt-1 size-4 accent-primary"
                />
                <span>
                  I consent to UNDP using this information to follow up.
                </span>
              </label>
              <Button disabled={status === "sending"} type="submit">
                {status === "sending" ? "Sending..." : "Send request"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="country" className="m-0">
            <form
              onSubmit={(event) => submit(event, "country support")}
              className="grid gap-4"
            >
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Name" name="name" required />
                <Field label="Email" name="email" type="email" required />
                <SelectField
                  label="Country"
                  name="country"
                  required
                  options={countries}
                />
                <SelectField
                  label="Submitting as"
                  name="submitterType"
                  required
                  options={[
                    "UNDP Country Office",
                    "Government counterpart",
                    "Joint UNDP and government team",
                    "Other",
                  ]}
                />
                <Field
                  label="Organisation and role"
                  name="organisationRole"
                  required
                />
                <SelectField
                  label="When could the country engage?"
                  name="timing"
                  required
                  options={[
                    "Immediately",
                    "Within 6 months",
                    "6-12 months",
                    "Later",
                    "Unsure",
                  ]}
                />
              </div>
              <CheckboxList
                label="Relevant use cases"
                name="useCases"
                options={useCaseOptions}
              />
              <div className="grid gap-3 sm:grid-cols-3">
                <SelectField
                  label="Digital ID"
                  name="digitalId"
                  required
                  options={maturityOptions}
                />
                <SelectField
                  label="Payments"
                  name="payments"
                  required
                  options={maturityOptions}
                />
                <SelectField
                  label="Data exchange"
                  name="dataExchange"
                  required
                  options={maturityOptions}
                />
              </div>
              <TextArea
                label="What support would be useful?"
                name="supportNeeded"
                required
                placeholder="Describe the priority, blocker, or public service problem."
              />
              <label className="flex items-start gap-2 text-sm leading-6 text-muted-foreground">
                <input
                  required
                  type="checkbox"
                  name="authority"
                  value="yes"
                  className="mt-1 size-4 accent-primary"
                />
                <span>
                  I confirm I can submit this on behalf of my organisation.
                </span>
              </label>
              <Button disabled={status === "sending"} type="submit">
                {status === "sending" ? "Sending..." : "Request support"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        {message ? (
          <div
            className={`rounded-md border px-3 py-2 text-sm ${
              status === "error"
                ? "border-destructive/30 text-destructive"
                : "bg-secondary"
            }`}
          >
            {message}
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
