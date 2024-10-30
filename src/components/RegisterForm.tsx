/* eslint-disable @typescript-eslint/no-explicit-any */
/* @refresh reload */
// import { render } from 'solid-js/web'

import { createForm } from "@tanstack/solid-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { usernameSchema, usernameValidation } from "../schema";

import type { FieldApi } from "@tanstack/solid-form";

interface FieldInfoProps {
  field: FieldApi<any, any, any, any>;
}

function FieldInfo(props: FieldInfoProps) {
  return (
    <>
      {props.field.state.meta.isTouched &&
      props.field.state.meta.errors.length ? (
        <em>{props.field.state.meta.errors.join(",")}</em>
      ) : null}
      {props.field.state.meta.isValidating ? (
        <p>"Checking if username is available on Dash Platform..."</p>
      ) : null}
    </>
  );
}

export function RegisterForm() {
  const form = createForm(() => ({
    defaultValues: {
      firstName: "",
      lastName: "",
    },
    onSubmit: async ({ value }) => {
      // Do something with form data
      console.log(value);
    },
    // Add a validator to support Zod usage in Form and Field
    validatorAdapter: zodValidator(),
  }));

  return (
    <div>
      {/* <h3>Register</h3> */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div>
          {/* A type-safe field component*/}
          <form.Field
            name="firstName"
            validators={{
              onChange: usernameSchema,
              onChangeAsyncDebounceMs: 1000,
              onChangeAsync: usernameValidation,
            }}
            children={(field) => {
              // Avoid hasty abstractions. Render props are great!
              return (
                <>
                  <label for={field().name}>{``}</label>
                  <input
                    id={field().name}
                    name={field().name}
                    value={field().state.value}
                    onBlur={field().handleBlur}
                    onInput={(e) => field().handleChange(e.target.value)}
                  />
                  <p>
                    <FieldInfo field={field()} />
                  </p>
                </>
              );
            }}
          />
        </div>
        <form.Subscribe
          selector={(state) => ({
            canSubmit: state.canSubmit,
            isSubmitting: state.isSubmitting,
          })}
          children={(state) => {
            return (
              <button type="submit" disabled={!state().canSubmit}>
                {state().isSubmitting ? "..." : "Submit"}
              </button>
            );
          }}
        />
      </form>
    </div>
  );
}

// const root = document.getElementById('root')

// render(() => <App />, root!)
