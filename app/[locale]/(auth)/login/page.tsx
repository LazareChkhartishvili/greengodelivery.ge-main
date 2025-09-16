import LoginForm from "@/components/auth/login-form"
import Image from "next/image"
import Link from "next/link"

const Login = () => {
  return (
    <section className="flex h-screen w-full items-center justify-center">
      <div className="container">
        <div className="grid lg:grid-cols-2">
          <div className="relative overflow-hidden py-10">
            <div className="mx-auto my-auto flex h-full w-full max-w-md flex-col justify-center gap-4 p-6">
              <div className="mb-6 flex flex-col items-center text-center">
                <Link href="/" className="mb-6 flex items-center gap-2">
                  <Image
                    width={300}
                    height={48}
                    src="https://shadcnblocks.com/images/block/logos/shadcnblockscom-wordmark.svg"
                    className="max-h-12"
                    alt="Shadcn UI Navbar"
                  />
                </Link>
              </div>
              <div className="w-full rounded-md bg-background">
                <div>
                  <LoginForm />
                </div>
              </div>
              {/* <div className="mx-auto mt-3 flex justify-center gap-1 text-sm text-muted-foreground">
                <p>Don&apos; have an account?</p>
                <a href="#" className="font-medium text-primary">
                  Signup
                </a>
              </div> */}
            </div>
          </div>

          <Image
            width={800}
            height={200}
            src="https://images.pexels.com/photos/3584969/pexels-photo-3584969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="placeholder"
            className="hidden h-full max-h-screen rounded-md object-cover lg:block"
          />
        </div>
      </div>
    </section>
  )
}

export default Login
