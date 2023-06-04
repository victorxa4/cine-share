import { useAutoAnimate } from '@formkit/auto-animate/react';
import { forwardRef } from 'react';
import { IButtonProps } from 'types/presentation/button';
import { Loader } from '../Loader';
import { ButtonStyled } from './styles';

export const Button = forwardRef<HTMLButtonElement, IButtonProps>(({
  children, loading, outline = false, schemaColor, ...props
}, elementRef) => {
  const [parent] = useAutoAnimate();
  return (
    <ButtonStyled
      type="button"
      {...props}
      ref={elementRef}
      isoutline={outline ? 'true' : 'false'}
      loading={loading ? 'true' : 'false'}
      schemaColor={schemaColor}
      disabled={loading || props.disabled}
    >
      <div className="wrapper" ref={parent}>
        {loading && (
          <div className="container-loader">
            <Loader />
          </div>
        )}

        <div className="content">
          {children}
        </div>
      </div>
    </ButtonStyled>
  );
});

Button.defaultProps = {
  outline: false,
  schemaColor: 'blue',
  loading: false,
};
