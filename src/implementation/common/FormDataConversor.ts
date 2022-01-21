const spreadArray = (fd: FormData, property: string, array: Array<any>) => {
  array.forEach((item) => {
    fd.append(property, item);
  });
};

export const toFormData = (
  obj: Record<string, any>,
  form?: FormData,
  namespace?: string,
) => {
  const fd = form || new FormData();
  let formKey;

  // eslint-disable-next-line no-restricted-syntax
  for (const property in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(property) && obj[property]) {
      formKey = namespace ? `${namespace}[${property}]` : property;

      if (obj[property] instanceof Date) {
        fd.append(formKey, obj[property].toISOString());
      } else if (obj[property] instanceof Array) {
        spreadArray(fd, property, obj[property]);
      } else if (
        typeof obj[property] === 'object' &&
        !(obj[property] instanceof File)
      ) {
        toFormData(obj[property], fd, formKey);
      } else {
        fd.append(formKey, obj[property]);
      }
    }
  }

  return fd;
};
