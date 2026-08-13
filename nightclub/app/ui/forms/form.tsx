"use client";

import {
  createContext,
  useActionState,
  useContext,
  type ReactNode,
} from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/app/ui/button";
import Message from "@/app/ui/message";
import Spinner from "@/app/ui/spinner";
import type { FormState } from "@/app/lib/actions";

const INITIAL: FormState = { status: "idle" };

/*
  State is shared through context rather than a render prop */
const FormStateContext = createContext<FormState>(INITIAL);

/** Used by Input and Textarea to find the error for their own `name`. */
export function useFieldError(name: string) {
  return useContext(FormStateContext).errors?.[name]?.[0];
}

export function useFieldValue(name: string) {
  return useContext(FormStateContext).values?.[name];
}

/** Wraps a Server Action with `useActionState`. `className` styles the fields only */
export default function Form({
  action,
  className = "",
  children,
}: {
  action: (state: FormState, formData: FormData) => Promise<FormState>;
  className?: string;
  children: ReactNode;
}) {
  const [state, formAction] = useActionState(action, INITIAL);

  return (
    <FormStateContext.Provider value={state}>
      <form action={formAction} noValidate className="flex flex-col gap-4">
        <div className={className}>{children}</div>

        {state.message && (
          <Message tone={state.status === "success" ? "success" : "error"}>
            {state.message}
          </Message>
        )}
      </form>
    </FormStateContext.Provider>
  );
}

/** Reads pending from the enclosing form, so it can sit anywhere in the layout. */
export function SubmitButton({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className={className}>
      {pending ? <Spinner label={children} /> : children}
    </Button>
  );
}
