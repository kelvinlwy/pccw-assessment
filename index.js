/**
 * Example problem with existing solution and passing test.
 * See problem 0 in the spec file for the assertion
 * @returns {string}
 */
exports.example = () => 'hello world';

exports.stripPrivateProperties = (props, arr) => {
  return arr.map((item) => {
    props.forEach((prop) => {
      if (item[prop]) {
        delete item[prop];
      }
    });
    return item;
  });
};

exports.excludeByProperty = (prop, arr) => {
  return arr.filter(item => item[prop] === undefined);
};

exports.sumDeep = (arr) => {
  return arr.map(item => {
    const key = Object.keys(item)[0];

    const sum = item.objects.reduce((acc, cur) => {
      return acc + cur.val;
    }, 0);

    return {[key]: sum};
  });
};

exports.applyStatusColor = (colorMap, arr) => {
  return arr.map(item => {
    const color = Object.keys(colorMap).find(key => {
      return colorMap[key].includes(item.status);
    });

    return {
      ...item,
      color
    }
  }).filter(status => {
    return status.color !== undefined
  });
};

exports.createGreeting = (greet, greeting) => {
  return name => greet(greeting, name);
};

exports.setDefaults = defaultProps => props => {
  let newObject = Object.assign({}, props);

  Object.keys(defaultProps).forEach(prop => {
    if (newObject[prop] === undefined) {
      newObject[prop] = defaultProps[prop];
    }
  });
  return newObject;
};

exports.fetchUserByNameAndUsersCompany = async (name, services) => {
  const status = await services.fetchStatus();
  const users = await services.fetchUsers();

  const user = users.find(item => {
    return item.name.localeCompare(name) === 0;
  });

  const company = await services.fetchCompanyById(user.companyId);

  return {status, user, company};
};
