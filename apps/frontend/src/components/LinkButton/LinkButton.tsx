import { ReactNode } from 'react';
import Link from 'next/link';
import MuiLink from '@mui/material/Link';
import { Url } from 'next/dist/shared/lib/router/router';

interface Props {
  href: string | Url;
  component?: React.ElementType;
  replace?: boolean;
  scroll?: boolean;
  prefetch?: boolean;
  children?: ReactNode;
  shallow?: boolean;
}

const LinkButton: React.FC<Props> = ({
  href,
  replace = false,
  scroll = true,
  prefetch = true,
  shallow = false,
  children,
}) => {
  return (
    <Link
      href={href}
      replace={replace}
      scroll={scroll}
      prefetch={prefetch}
      legacyBehavior
      passHref
      shallow={shallow}
    >
      <MuiLink component="a">{children}</MuiLink>
    </Link>
  );
};

export { LinkButton };
