function userType() {
    const isFree = function(user) {
	!(user.Subscribed & 1);
    }
    const isAdmin = function(user) {
	!isFree(user) && user.Role === PAID_ADMIN_ROLE;
    }
}