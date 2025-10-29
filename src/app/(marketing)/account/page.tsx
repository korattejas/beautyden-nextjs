export const dynamic = "force-static";

export default function AccountPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <aside className="md:col-span-1 bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <h2 className="text-lg font-semibold mb-4">My Account</h2>
          <nav className="space-y-2 text-sm">
            <a className="block px-3 py-2 rounded-lg bg-gray-900 text-white">Overview</a>
            <a className="block px-3 py-2 rounded-lg hover:bg-gray-50">Profile</a>
            <a className="block px-3 py-2 rounded-lg hover:bg-gray-50">Password</a>
            <a className="block px-3 py-2 rounded-lg hover:bg-gray-50">Addresses</a>
            <a className="block px-3 py-2 rounded-lg hover:bg-gray-50">Wishlist</a>
          </nav>
        </aside>

        <section className="md:col-span-3 space-y-6">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h3 className="text-xl font-semibold">Welcome back, John!</h3>
            <p className="text-sm text-gray-600 mt-1">Manage your account and explore recent activity.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h4 className="font-semibold">Orders</h4>
              <p className="text-sm text-gray-600">You have 3 active orders</p>
              <button className="mt-3 text-sm px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50">View Orders</button>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h4 className="font-semibold">Wishlist</h4>
              <p className="text-sm text-gray-600">5 items in your wishlist</p>
              <button className="mt-3 text-sm px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50">View Wishlist</button>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h4 className="font-semibold">Saved Addresses</h4>
              <p className="text-sm text-gray-600">2 addresses saved</p>
              <button className="mt-3 text-sm px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50">Manage Addresses</button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}


