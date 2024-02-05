import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    
  constructor(props:Props) {
      super(props);
      this.state = { hasError: false };
    }
  
    // с помощью этого метода меняем стейт компонента при возникновении ошибки:
    static getDerivedStateFromError(error: Error): State {
      return { hasError: true };
    }
  
    // с помощью этого метода логируем информацию об ошибке:
    componentDidCatch(error: Error, info: ErrorInfo) {
      console.log("Возникла ошибка!", error, info);
    }
  
    render() {
      if (this.state.hasError) {
        // если возникла ошибка, сообщаем об этом пользователю в специальном компоненте:
        return (
          <section>
            <h1>Что-то пошло не так :(</h1>
            <p>
              В приложении произошла ошибка. Пожалуйста, перезагрузите страницу.
            </p>
          </section>
        );
      }
      // если всё работает штатно, рендерим дочерние компоненты
      return this.props.children;
    }
  }

  export default ErrorBoundary;
  