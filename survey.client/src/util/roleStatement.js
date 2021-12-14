const roleStatement = (user) => {
    if(!user){
        return 'unAuthenticated';
    }else if (user && (user.role === 10 || (user.roleFromToken && user.roleFromToken === "Member"))){
        return 'authenticated';
    }else if(user && (user.role === 20 || (user.roleFromToken && user.roleFromToken === "Admin"))){
        return 'admin';
    }
}
export default roleStatement;