const userModule = require('./../models/index')

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await userModule.login(email, password);

    if(!result.success) {
      throw(result.error);
    }

    return res.status(200).json({
      success: true,
      data: result.data
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error
    });
  }
};

const register = async (req, res) => {
  try {
    const { 
      email, 
      password,
      uuid_rol,
      name,
      lastName,
      phone
    } = req.body;

    const result = await userModule.register(email, password, uuid_rol, name, lastName, phone);

    if(!result.success) {
      throw(result.error);
    }

    return res.status(200).json({
      success: true,
      data: result.data
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error
    });
  }
}

const validate = async (req, res) => {
  try {
    const { uuid } = req.body;

    const result = await userModule.validate(uuid);

    if(!result.success) {
      throw(result.error);
    }

    return res.status(200).json({
      success: true,
      data: result.data
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error
    });
  }
}

const forgot = async (req, res) => {
  try {
    const { email } = req.body;

    const result = await userModule.forgot(email);

    if(!result.success) {
      throw(result.error);
    }

    return res.status(200).json({
      success: true,
      data: {
        code: result.code,
        uuid: result.uuid
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error
    });
  }
}

const restore = async (req, res) => {
  try {
    const { password, uuid } = req.body;
    
    const result = await userModule.restore(password, uuid);
    
    if(!result.success) {
      throw(result.error);
    }

    return res.status(200).json({
      success: true,
      data: result.data
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error
    });
  }
}

module.exports = {
  login,
  register,
  validate,
  forgot,
  restore
};
