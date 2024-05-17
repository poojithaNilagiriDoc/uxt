import classnames from 'classnames';
import includes from 'lodash/fp/includes';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import makeStyles from '../../_helpers/makeStyles';

const useStyles = makeStyles(
  createStyles({
    root: {},
    contentItem: {
      display: 'flex',
      flex: '1 1 auto',
      flexDirection: 'column',
      overflow: 'hidden',
    },
  }),
  { name: 'UxtContentSwitcher' },
);

export interface ContentSwitcherProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  classes?: object;
  contentKey?: string;
  contentMap?: { [key: string]: React.ReactNode };
  fallbackContent?: React.ReactNode;
  useDisplayNone?: boolean;
}

function ContentSwitcher(props: ContentSwitcherProps) {
  const {
    className,
    classes: classesProp,
    contentKey,
    contentMap = {},
    fallbackContent = null,
    useDisplayNone,
    ...rest
  } = props;
  const classes = useStyles(props);

  const content = React.useMemo(() => {
    if (useDisplayNone) {
      return (
        <>
          {Object.keys(contentMap).map(key => (
            <div
              className={classes.contentItem}
              key={key}
              style={{ display: key === contentKey ? '' : 'none' }}
            >
              {contentMap[key]}
            </div>
          ))}
          <div
            className={classes.contentItem}
            style={{
              display: !includes(contentKey, Object.keys(contentMap))
                ? ''
                : 'none',
            }}
          >
            {fallbackContent}
          </div>
        </>
      );
    }

    return contentMap[contentKey] || fallbackContent;
  }, [
    classes.contentItem,
    contentKey,
    contentMap,
    fallbackContent,
    useDisplayNone,
  ]);

  return (
    <div className={classnames(classes.root, className)} {...rest}>
      {content}
    </div>
  );
}

export default React.memo(ContentSwitcher);
