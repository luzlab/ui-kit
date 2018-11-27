import * as React from 'react';

import { useWindowResize } from '../hooks/useWindowResize';
import { PopupContent } from './PopupContent';
import { IPopupDefaultProps, IPopupProps } from './types';
import { calculateStyles, getDefaultStyle } from './utils';

export { IPopupProps, IPopupDefaultProps };

export const Popup = (props: IPopupProps) => {
  const triggerRef = React.useRef<HTMLElement>(null);
  const contentRef = React.createRef<HTMLDivElement>();
  const [isVisible, setVisibility] = React.useState<boolean>(false);
  const lastResizeTimestamp = useWindowResize();
  let lastRepaintTimestamp = 0;
  const [style, setStyle] = React.useState<React.CSSProperties | undefined>(undefined);
  let isOverTrigger: boolean = false;
  let isOverContent: boolean = false;
  // Number could be set here, but unfortunately Node returns Timeout which is not exported
  let willHide: any;

  const repaint = React.useCallback(
    () => {
      if (isVisible) {
        lastRepaintTimestamp = Date.now();
        setStyle({
          ...getDefaultStyle(props),
          ...calculateStyles(triggerRef, contentRef, props),
        });
      }
    },
    [props.width, props.offset, props.posX, props.posY, contentRef, lastRepaintTimestamp]
  );

  if (typeof window !== 'undefined') {
    React.useEffect(repaint, [lastResizeTimestamp]);
  }

  const showPopup = () => {
    if (willHide !== undefined) {
      clearTimeout(willHide);
      willHide = undefined;
    }

    setVisibility(true);
  };

  const hidePopup = () => {
    if (willHide !== undefined) {
      return;
    }

    willHide = setTimeout(() => {
      isOverTrigger = false;
      isOverContent = false;
      setVisibility(false);
    }, props.hideDelay);
  };

  const { renderTrigger, renderContent } = props;

  const funcs = {
    isVisible,
    showPopup,
    hidePopup,
  };

  const handleMouseEnter = ({ target }: React.SyntheticEvent<HTMLElement>) => {
    if (target === triggerRef.current) {
      isOverTrigger = true;
    } else if (target === contentRef.current) {
      isOverContent = true;
    }

    showPopup();
  };

  const handleMouseLeave = ({ target }: React.SyntheticEvent<HTMLElement>) => {
    if (target === triggerRef.current) {
      isOverTrigger = false;
    } else if (target === contentRef.current) {
      isOverContent = false;
    }

    if (isVisible && !isOverTrigger && !isOverContent) {
      hidePopup();
    }
  };

  return (
    <>
      {React.cloneElement(
        renderTrigger({
          ...funcs,
          isOver: isOverTrigger,
        }),
        {
          onMouseEnter: handleMouseEnter,
          onMouseLeave: handleMouseLeave,
          ref: triggerRef,
        }
      )}
      {isVisible && (
        <PopupContent
          ref={contentRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={style}
          repaint={repaint}
        >
          {renderContent({
            ...funcs,
            isOver: isOverContent,
          })}
        </PopupContent>
      )}
    </>
  );
};

Popup.defaultProps = {
  padding: 15,
  hideDelay: 200,
  posX: 'left',
  posY: 'top',
} as IPopupDefaultProps;
