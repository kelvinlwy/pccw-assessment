/**
 * Example problem with existing solution and passing test.
 * See problem 0 in the spec file for the assertion
 * @returns {string}
 */
exports.example = () => 'hello world';

exports.stripPrivateProperties = (props, arr) => {
  return arr.map((item) => {
    props.forEach((prop) => {
      delete item[prop];
    });
    return item;
  });
};

exports.excludeByProperty = (prop, arr) => {
  return arr.filter(item => !item.hasOwnProperty(prop));
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
  // Create new color map with status as key
  const newColorMap = {};
  Object.keys(colorMap).forEach(key => {
    colorMap[key].forEach(status => {
      newColorMap[status] = key;
    })
  });

  return arr.map(item => {
    return {
      ...item,
      color: newColorMap[item.status]
    }
  }).filter((status) => {
    return status.color;
  });
};

exports.createGreeting = (greet, greeting) => {
  return name => greet(greeting, name);
};

exports.setDefaults = defaultProps => props => {
  return Object.assign({}, defaultProps, props);
};

exports.fetchUserByNameAndUsersCompany = async (name, services) => {
  return await Promise.all([
    await services.fetchStatus().then(status => {
      return {status};
    }),
    await Promise.all(
      await services.fetchUsers()
    ).then(async users => {
      const user = users.find(item => {
        return item.name.localeCompare(name) === 0;
      });

      return {user: user, company: await services.fetchCompanyById(user.companyId)};
    })
  ]).then((result) => {
    return {...result[0], ...result[1]};
  });
};
