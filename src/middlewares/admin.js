module.exports = async (ctx, next) => {
     // Instead of using this header we can verify that the user tipe in the DB is of type "Admin"
    const isAdmin = await ( ctx.headers.is_admin === 'true' )

    // If the user is an Admin type continue with the execution
    if (isAdmin) {
        await next()
    } else { // Otherwise return an 401 Unauthorized Error
        ctx.status = 401
        ctx.body = {
            status: 'error',
            message: `You're not an administrator`
        }
    }
}