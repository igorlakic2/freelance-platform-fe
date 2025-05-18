const axiosConfig = <P>(/*token?: string,*/ params?: P) => {
  return {
    headers: {
      // Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    params: params ? params : {},
  };
};

export { axiosConfig };
