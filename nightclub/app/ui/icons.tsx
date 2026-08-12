import type { SVGProps } from "react";

function Icon({ children, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className="size-4"
      {...props}
    >
      {children}
    </svg>
  );
}

export function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M14.5 8.5V6.8c0-.7.2-1.1 1.2-1.1H17V3.1c-.3 0-1.1-.1-2-.1-2 0-3.4 1.2-3.4 3.5v2H9.3V11h2.3v8h2.9v-8h2.3l.3-2.5h-2.6Z" />
    </Icon>
  );
}

export function TwitterIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M21 5.9c-.7.3-1.4.5-2.1.6.8-.5 1.3-1.2 1.6-2-.7.4-1.5.7-2.3.9a3.6 3.6 0 0 0-6.2 3.3A10.3 10.3 0 0 1 4.5 4.9a3.6 3.6 0 0 0 1.1 4.8c-.6 0-1.2-.2-1.6-.4a3.6 3.6 0 0 0 2.9 3.6c-.5.1-1 .2-1.6.1a3.6 3.6 0 0 0 3.4 2.5A7.3 7.3 0 0 1 3 17c1.7 1 3.6 1.7 5.7 1.7 6.8 0 10.5-5.6 10.5-10.5v-.5c.7-.5 1.3-1.1 1.8-1.8Z" />
    </Icon>
  );
}

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M12 4.6c2.4 0 2.7 0 3.6.1.9 0 1.4.2 1.7.3.4.2.7.4 1 .7.3.3.5.6.7 1 .1.3.3.8.3 1.7.1.9.1 1.2.1 3.6s0 2.7-.1 3.6c0 .9-.2 1.4-.3 1.7-.2.4-.4.7-.7 1-.3.3-.6.5-1 .7-.3.1-.8.3-1.7.3-.9.1-1.2.1-3.6.1s-2.7 0-3.6-.1c-.9 0-1.4-.2-1.7-.3a2.8 2.8 0 0 1-1-.7 2.8 2.8 0 0 1-.7-1c-.1-.3-.3-.8-.3-1.7-.1-.9-.1-1.2-.1-3.6s0-2.7.1-3.6c0-.9.2-1.4.3-1.7.2-.4.4-.7.7-1 .3-.3.6-.5 1-.7.3-.1.8-.3 1.7-.3.9-.1 1.2-.1 3.6-.1M12 3c-2.4 0-2.8 0-3.7.1-.9 0-1.6.2-2.2.4-.6.2-1.1.5-1.6 1-.5.5-.8 1-1 1.6-.2.6-.4 1.3-.4 2.2C3 9.2 3 9.6 3 12s0 2.8.1 3.7c0 .9.2 1.6.4 2.2.2.6.5 1.1 1 1.6.5.5 1 .8 1.6 1 .6.2 1.3.4 2.2.4.9.1 1.3.1 3.7.1s2.8 0 3.7-.1c.9 0 1.6-.2 2.2-.4.6-.2 1.1-.5 1.6-1 .5-.5.8-1 1-1.6.2-.6.4-1.3.4-2.2.1-.9.1-1.3.1-3.7s0-2.8-.1-3.7c0-.9-.2-1.6-.4-2.2a4.4 4.4 0 0 0-1-1.6 4.4 4.4 0 0 0-1.6-1c-.6-.2-1.3-.4-2.2-.4C14.8 3 14.4 3 12 3Zm0 4.4a4.6 4.6 0 1 0 0 9.2 4.6 4.6 0 0 0 0-9.2Zm0 7.6a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm5.8-7.8a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0Z" />
    </Icon>
  );
}

export function SnapchatIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M12 3c2.5 0 4.3 1.9 4.4 4.4 0 .6 0 1.2-.1 1.8.3.1.6.1.9 0 .5-.2 1 .1 1.1.5.1.4-.1.8-.6 1-.4.2-1 .4-1.2.6-.2.3.4 1.6 1.4 2.5.5.4 1.1.7 1.7.9.4.1.5.5.4.8-.2.5-1.1.8-2.1 1-.2.4-.2.8-.4 1-.2.2-.6.1-1 .1-.6 0-1.2 0-1.9.4-.7.4-1.4 1-2.6 1s-1.9-.6-2.6-1c-.7-.4-1.3-.4-1.9-.4-.4 0-.8.1-1-.1-.2-.2-.2-.6-.4-1-1-.2-1.9-.5-2.1-1-.1-.3 0-.7.4-.8.6-.2 1.2-.5 1.7-.9 1-.9 1.6-2.2 1.4-2.5-.2-.2-.8-.4-1.2-.6-.5-.2-.7-.6-.6-1 .1-.4.6-.7 1.1-.5.3.1.6.1.9 0-.1-.6-.1-1.2-.1-1.8C7.7 4.9 9.5 3 12 3Z" />
    </Icon>
  );
}

export function MenuIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M3 6h18v2H3V6Zm0 5h18v2H3v-2Zm0 5h18v2H3v-2Z" />
    </Icon>
  );
}

export function CloseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M19 6.4 17.6 5 12 10.6 6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12 19 6.4Z" />
    </Icon>
  );
}

export function ChevronLeftIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M15.4 4.6 8 12l7.4 7.4 1.4-1.4L10.8 12l6-6-1.4-1.4Z" />
    </Icon>
  );
}

export function ChevronRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M8.6 4.6 16 12l-7.4 7.4-1.4-1.4 6-6-6-6 1.4-1.4Z" />
    </Icon>
  );
}
