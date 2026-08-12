import Image from "next/image";
import Container from "@/app/ui/container";
import Logo from "@/app/ui/logo";
import {
  FacebookIcon,
  InstagramIcon,
  SnapchatIcon,
  TwitterIcon,
} from "@/app/ui/icons";

const SOCIALS = [
  { href: "https://facebook.com", label: "Facebook", Icon: FacebookIcon },
  { href: "https://twitter.com", label: "Twitter", Icon: TwitterIcon },
  { href: "https://snapchat.com", label: "Snapchat", Icon: SnapchatIcon },
  { href: "https://instagram.com", label: "Instagram", Icon: InstagramIcon },
];

const RECENT_POSTS = [
  {
    image: "/content-img/recent_post1.jpg",
    excerpt:
      "It is a long established fact that a reader will be distracted by the readable...",
    time: "5 hours ago",
  },
  {
    image: "/content-img/recent_post2.jpg",
    excerpt:
      "There are many variations of passages of Lorem Ipsum available, but the...",
    time: "2 days ago",
  },
];

const RECENT_TWEETS = [
  {
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting.",
    date: "April 17, 2018",
  },
  {
    text: "Contrary to popular belief, Lorem Ipsum is not simply random text.",
    date: "April 3, 2018",
  },
];

function ColumnHeading({ children }: { children: string }) {
  return (
    <h2 className="mb-4 text-xs font-medium tracking-widest text-pink">
      {children}
    </h2>
  );
}

export default function Footer() {
  return (
    <footer className="relative isolate mt-auto border-t border-line">
      <Image
        src="/bg/footerbg.jpg"
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover opacity-15"
      />

      <Container className="grid gap-10 py-section lg:grid-cols-3">
        <div className="flex flex-col gap-6">
          <Logo />

          <div>
            <ColumnHeading>Location</ColumnHeading>
            <div className="flex items-start gap-3">
              <address className="text-sm not-italic text-ink">
                Kompagnistræde 278
                <br />
                1265 København K
              </address>
            </div>
          </div>

          <div>
            <ColumnHeading>Opening Hours</ColumnHeading>
            <p className="text-sm text-ink">
              WED – THU: 10:30 PM TO 3 AM
              <br />
              SAT – SUN: 11 PM TO 5 AM
            </p>
          </div>
        </div>

        <div>
          <ColumnHeading>Recent Posts</ColumnHeading>
          <ul className="flex flex-col gap-5">
            {RECENT_POSTS.map((post) => (
              <li key={post.image} className="flex gap-4">
                <Image
                  src={post.image}
                  alt=""
                  width={100}
                  height={91}
                  className="size-16 shrink-0 object-cover"
                />
                <div>
                  <p className="text-sm text-ink">{post.excerpt}</p>
                  <p className="mt-1 text-xs text-ink/60">{post.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <ColumnHeading>Recent Tweets</ColumnHeading>
          <ul className="flex flex-col gap-5">
            {RECENT_TWEETS.map((tweet) => (
              <li key={tweet.date} className="flex gap-4">
                <span className="mt-0.5 shrink-0 text-pink">
                  <TwitterIcon />
                </span>
                <div>
                  <p className="text-sm text-ink">{tweet.text}</p>
                  <p className="mt-1 text-xs text-ink/60">{tweet.date}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="py-6">
        <Container>
          <div className="grid items-center gap-6 text-center text-xs text-ink/80 sm:grid-cols-3">
            <p className="sm:text-left">
              Night Club PSD Template - All Rights Reserved
            </p>

            <div className="flex flex-col items-center gap-2">
              <h2 className="text-xs font-medium tracking-widest">
                Stay Connected With Us
              </h2>
              <ul className="flex gap-3">
                {SOCIALS.map(({ href, label, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={label}
                      className="flex size-9 items-center justify-center border border-line text-ink transition-colors hover:border-pink hover:text-pink"
                    >
                      <Icon />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <p className="sm:text-right">Copyright © 2018 NightClub</p>
          </div>
        </Container>
      </div>
    </footer>
  );
}
