import userApi from "../api/userApi";

const getAllUsers = async () => {
    const response = await userApi.getAll();
    return response.data.data.map(item => ({
        id: item.userId,
        username: item.username,
        fullname: item.fullname,
        email: item.email,
        phone: item.phone,
        address: item.address,
        role: item.role,
        isActive: item.isActive,
        createdAt: item.createdAt,
    }))
}


const getUserByUserName = async (username) => {
    const response = await userApi.getByUserName(username);
    const item = response.data.data;
    return {
        id: item.userId,
        userName: item.username,
        fullName: item.fullName,
        email: item.email,
        phone: item.phone,
        address: item.address,
        role: item.role,
        isActive: item.isActive,
        createdAt: item.createdAt,
    };
}

const updateUser = async (user) => {
    const response = await userApi.update(user);
    return response.data.message;
}

const deleteUser = async (username) => {
    const response = await userApi.delete(username);
    return response.data.message;
}

export { getAllUsers, getUserByUserName, updateUser, deleteUser };