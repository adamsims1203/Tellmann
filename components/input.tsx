import { ChangeEvent, FC, FormEvent, InputHTMLAttributes, useRef } from "react";
import { Button } from "./button";

type InputProps = {
  button?: string | JSX.Element;
  icon?: JSX.Element;
  label?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  secondary?: boolean;
  submit?: (e: FormEvent<HTMLFormElement>, ref) => void;
  submitting?: boolean;
};

export const Input: FC<InputProps & InputHTMLAttributes<any>> = ({
  label,
  button,
  submit,
  submitting = false,
  placeholder,
  icon,
  secondary,
  onChange,
  ...props
}) => {
  const inputRef = useRef();
  const submitWithRef = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submit) {
      submit(e, inputRef);
    }
  };

  return (
    <>
      <form className="input-group" onSubmit={submitWithRef}>
        <input
          aria-label={label || placeholder}
          placeholder={placeholder}
          onChange={onChange}
          {...props}
          ref={inputRef}
        />
        {button
          ? <Button secondary small disabled={submitting} type="submit">
              {button}
            </Button>
          : null}
        {icon || null}
      </form>
      <style jsx>{`
        .input-group {
          font-size: 1.6rem;
          width: 100%;
          height: 4rem;
          display: flex;
          align-items: center;
          padding: 0 0 0 1.6rem;
          border: 1px solid var(--color-input-border);
          border-radius: var(--border-radius);
          background-color: ${secondary
            ? `var(--color-background)`
            : `var(--color-input-background)`};
          transition: box-shadow 0.2s;

          &:hover {
            border-color: var(--color-input-border-hover);
          }

          &:focus,
          &:active,
          &:focus-within {
            border-color: #3182ce;
            box-shadow: 0 0 0 1px #3182ce;
          }
          :global(svg) {
            margin-right: 1.6rem;
          }
        }

        input {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          font: inherit;
          border: 0;
          background-color: unset;
          color: ${submitting ? `var(--color-subdued)` : `inherit`};
          appearance: none;
          outline: none;
          pointer-events: ${submitting ? `none` : `all`};

          ::placeholder {
            color: var(--color-subdued);
          }
        }
      `}</style>
    </>
  );
};
