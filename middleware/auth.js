export default function(context) {
  if (context.isServer) console.log(context.req.headers)
  const { store, redirect, error } = context
  // If user not connected, redirect to /
  if (!store.state.userLoggedIn) {
    redirect('/')
  }
}