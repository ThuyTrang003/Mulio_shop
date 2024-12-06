import Image from "next/image";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="flex h-screen w-screen justify-between bg-white">
            <section className="h-screen w-1/2">{children}</section>
            <div className="m-2 flex w-1/2 justify-end rounded-xl">
                <Image
                    src={"/home/grid/collect-2.jpg"}
                    alt={"abc"}
                    width={1000}
                    height={1000}
                    className="h-full w-auto object-cover"
                />
            </div>
        </main>
    );
}
