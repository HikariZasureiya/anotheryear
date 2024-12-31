import React, {
    createContext,
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
  } from "react";
  import confetti from "canvas-confetti";

  
  // Create Context for Confetti
  const ConfettiContext = createContext({ fire: () => {} });
  
  // Define component first
  const ConfettiComponent = forwardRef((props, ref) => {
    const {
      options,
      globalOptions = { resize: true, useWorker: true },
      manualstart = false,
      children,
      ...rest
    } = props;
  
    const instanceRef = useRef(null);
  
    // Set up canvas element and create confetti instance
    const canvasRef = useCallback(
      (node) => {
        if (node !== null) {
          if (instanceRef.current) return;
          instanceRef.current = confetti.create(node, {
            ...globalOptions,
            resize: true,
          });
        } else {
          if (instanceRef.current) {
            instanceRef.current.reset();
            instanceRef.current = null;
          }
        }
      },
      [globalOptions],
    );
  
    const fire = useCallback(
      async (opts = {}) => {
        try {
          await instanceRef.current?.({ ...options, ...opts });
        } catch (error) {
          console.error("Confetti error:", error);
        }
      },
      [options],
    );
  
    // Expose fire function to the parent component
    const api = useMemo(
      () => ({
        fire,
      }),
      [fire],
    );
  
    useImperativeHandle(ref, () => api, [api]);
  
    useEffect(() => {
      if (!manualstart) {
        (async () => {
          try {
            await fire();
          } catch (error) {
            console.error("Confetti effect error:", error);
          }
        })();
      }
    }, [manualstart, fire]);
  
    return (
      <ConfettiContext.Provider value={api}>
        <canvas ref={canvasRef} {...rest} />
        {children}
      </ConfettiContext.Provider>
    );
  });
  
  ConfettiComponent.displayName = "Confetti";
  
  // Export Confetti component
  export const Confetti = ConfettiComponent;
  
  // Confetti button component
  const ConfettiButtonComponent = ({
    options,
    children,
    ...props
  }) => {
    const handleClick = async (event) => {
      try {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        await confetti({
          ...options,
          origin: {
            x: x / window.innerWidth,
            y: y / window.innerHeight,
          },
        });
      } catch (error) {
        console.error("Confetti button error:", error);
      }
    };
  
    return (
      <button className="bg-blue-500 w-12 h-12" onClick={handleClick} {...props}>
        {children}
      </button>
    );
  };
  
  ConfettiButtonComponent.displayName = "ConfettiButton";
  
  // Export ConfettiButton component
  export const ConfettiButton = ConfettiButtonComponent;
  