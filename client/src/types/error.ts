type BackendError = {
  message?: string;
  code?: string;
  errors?: [
    {
      path: string;
      message: string;
    }
  ];
};

export default BackendError;
