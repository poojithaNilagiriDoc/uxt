import React from 'react';
import classnames from 'classnames';
import createStyles from '@material-ui/core/styles/createStyles';
import isNumber from 'lodash/fp/isNumber';
import user from 'uxt-graphics/icons/user';
import showIf from '../_helpers/showIf';
import makeStyles from '../_helpers/makeStyles';
import Icon from '../Icon';
import { UxtTheme } from '../../themes/UxtTheme';
import getColorCodes from '../_helpers/getColorCodes';
import hideIf from '../_helpers/hideIf';
import Position from '../constants/position';
import lightTheme from '../../themes/light';
import toUpperCase from '../_helpers/toUpperCase';

function getSize(size) {
  if (isNumber(size)) return size;

  if (size === 'small') return 24;

  if (size === 'large') return 56;

  return 40;
}

function getFontSize(size: React.ReactText, theme: UxtTheme): React.ReactText {
  if (size > 24 || size !== 'small') return theme.typography.h6.fontSize;

  return theme.typography.caption.fontSize;
}

function getVariant(variant: string): React.ReactText {
  if (variant === 'rounded') return 4;

  if (variant === 'square') return 0;

  return '50%';
}

const available: JSX.Element = (
  <svg>
    <path fill="#6fbf50" d="M6,0A6,6,0,1,1,0,6,6.01764,6.01764,0,0,1,6,0Z" />
    <path
      fill="#fff"
      d="M5.2,8.3h0c-.2,0-.4,0-.5-.2L3.1,6.4a.74626.74626,0,0,1,0-.9.63112.63112,0,0,1,.9,0H4L5.3,6.8,8,3.9a.63282.63282,0,0,1,.9-.1h0a.56063.56063,0,0,1,0,.9L5.6,8.1A.39925.39925,0,0,1,5.2,8.3Z"
    />
  </svg>
);

const busy: JSX.Element = (
  <svg>
    <path fill="#fc381b" d="M6,0A6,6,0,1,1,0,6,6,6,0,0,1,6,0Z" />
  </svg>
);

const doNotDisturb: JSX.Element = (
  <svg>
    <path fill="#fc381b" d="M6,0A6,6,0,1,1,0,6,6,6,0,0,1,6,0Z" />
    <path
      fill="#fff"
      d="M9,7H3A1,1,0,0,1,2,6H2A1,1,0,0,1,3,5H9a1,1,0,0,1,1,1h0A1,1,0,0,1,9,7Z"
    />
  </svg>
);

const away: JSX.Element = (
  <svg>
    <path fill="#febb3f" d="M6,0A6,6,0,1,1,0,6,6,6,0,0,1,6,0Z" />
    <path
      fill="none"
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7.5,7.5l-2-2V2"
    />
  </svg>
);

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: ({ size }: AvatarProps) => getSize(size) + 8,
        height: ({ size }: AvatarProps) => getSize(size) + 8,
        borderRadius: ({ variant }: AvatarProps) => getVariant(variant),
        '&:hover': {
          background: theme.palette.action.hover,
          transition: 'background-color 0.2s ease-out',
        },
      },
      avatar: {
        color: '#fff',
        fontSize: ({ size }: AvatarProps) => getFontSize(size, theme),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        width: ({ size }: AvatarProps) => getSize(size),
        height: ({ size }: AvatarProps) => getSize(size),
        borderRadius: ({ variant }: AvatarProps) => getVariant(variant),
      },
      icon: {
        fill: '#fff',
      },
      disabled: {
        opacity: 0.5,
        cursor: 'not-allowed',
        pointerEvents: 'none',
        '& $badge': {
          opacity: 0.6,
          backgroundColor: theme.palette.text.primary,
        },
      },
      badge: {
        display: 'inline-block',
        position: 'relative',
      },
      status: {
        borderRadius: 6,
        display: 'flex',
        height: 12,
        pointerEvents: 'none',
        position: 'absolute',
        left: ({ status }: AvatarProps) => -theme.spacing(status ? 1.5 : 1),
        top: ({ statusPosition }: AvatarProps) =>
          statusPosition === Position.Top
            ? -theme.spacing(2.5)
            : theme.spacing(0.5),
        width: 12,
        boxShadow: ({ statusType, status }: AvatarProps) =>
          statusType && !status
            ? `0 0 0 2px ${theme.palette.background.paper}`
            : 'unset',
      },
    }),
  { name: 'UxtAvatar' },
);

export type Src = string | boolean;
export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  alt?: string;
  className?: string;
  classes?: Object;
  children?: React.ReactNode;
  enableBackgroundColor?: boolean;
  iconSvg?: string;
  isDisabled?: boolean;
  onClick?: () => void;
  requestHeaders?: { [key: string]: string };
  showStatus?: boolean;
  size?: 'small' | 'regular' | 'large';
  src?: string;
  status?: React.ReactNode;
  statusPosition?: Position.Bottom | Position.Top;
  statusType?: 'available' | 'away' | 'busy' | 'do not disturb';
  style?: Object;
  variant?: 'circle' | 'rounded' | 'square';
}

const Avatar = React.forwardRef(function Avatar(
  props: AvatarProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const {
    alt,
    classes: classesProp,
    className,
    children,
    enableBackgroundColor = true,
    iconSvg = user,
    isDisabled,
    onClick,
    requestHeaders,
    showStatus = false,
    size = 'regular',
    src: srcProp,
    status,
    statusPosition,
    statusType = 'available',
    style,
    ...rest
  } = props;

  const classes = useStyles(props);
  const [backgroundColor, setBackgroundColor] = React.useState<string>(
    lightTheme.palette.hexagon.deepGray[3],
  );
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const [src, setSrc] = React.useState<string>(srcProp);

  React.useEffect(() => {
    const addBackground: boolean = srcProp ? false : true;

    if (addBackground) setBackgroundColor(getColorCodes());
  }, [setBackgroundColor, srcProp]);

  const convertBlobToBase64 = (blob: Blob): Promise<unknown> =>
    new Promise((res, rej) => {
      const reader: FileReader = new FileReader();

      reader.onerror = rej;
      reader.onload = () => res(reader.result);

      reader.readAsDataURL(blob);
    });

  React.useEffect(() => {
    const handleRequestHeaders = async (): Promise<void> => {
      try {
        const res: Response = await fetch(srcProp, { headers: requestHeaders });
        const imageSrc: unknown = await convertBlobToBase64(await res.blob());

        setSrc(imageSrc as string);
        setLoaded(true);
      } catch (error) {
        setLoaded(false);
        console.error(error);
      }
    };

    if (srcProp) {
      if (requestHeaders) handleRequestHeaders();
      else {
        const image: HTMLImageElement = new Image();

        image.src = srcProp;

        image.onload = (): void => setLoaded(true);

        image.onerror = (): void => setLoaded(false);

        setSrc(srcProp);
      }
    }
  }, [srcProp, requestHeaders]);

  return (
    <div
      className={classnames(
        classes.root,
        {
          [classes.disabled]: isDisabled,
        },
        className,
      )}
      onClick={onClick}
      ref={ref}
      {...rest}
    >
      <div
        className={classes.avatar}
        style={{
          backgroundColor: enableBackgroundColor
            ? backgroundColor
            : 'transparent',
          ...style,
        }}
      >
        {showIf(loaded)(<img className={classes.avatar} alt="" src={src} />)}
        {showIf(!loaded)(
          <>
            {showIf(iconSvg && !children && !alt)(
              <Icon className={classes.icon} svg={iconSvg} size={size} />,
            )}
            {showIf(alt)(() => toUpperCase(alt.substr(0, 1)))}
            {showIf(children)(<span className={classes.icon}>{children}</span>)}
          </>,
        )}
      </div>
      {showIf(showStatus)(
        <div className={classes.badge}>
          <div className={classes.status}>
            <>
              {showIf(status)(() => status)}
              {hideIf(status)(() => (
                <>
                  {showIf(statusType === 'available')(available)}
                  {showIf(statusType === 'away')(away)}
                  {showIf(statusType === 'busy')(busy)}
                  {showIf(statusType === 'do not disturb')(doNotDisturb)}
                </>
              ))}
            </>
          </div>
        </div>,
      )}
    </div>
  );
});

export default React.memo(Avatar);
