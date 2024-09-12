
const parseType = (type) => {
    const isString = typeof type === 'string';
    if (!isString) return;
    const isType = (type) => ['work', 'home', 'personal'].includes(type);
  
    if (isType(type)) return type;
  };

  export const parseContactFilterParams = (query) => {
    const { contactType } = query;
  
    const parsedType = parseType(contactType );

  
    return {
    contactType: parsedType,

    };
};

export default parseContactFilterParams;