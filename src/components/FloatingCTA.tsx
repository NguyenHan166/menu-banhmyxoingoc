import Image from "next/image";
import { getTelUrl, getZaloUrl } from "@/lib/utils";

interface FloatingContactProps {
    hotline: string;
}

export default function FloatingContact({ hotline }: FloatingContactProps) {
    return (
        <div className="floating-contact">
            {/* Phone button - on top */}
            <a
                href={getTelUrl(hotline)}
                className="floating-contact-btn phone"
                title="Gọi đặt món"
                aria-label="Gọi điện thoại"
            >
                <svg
                    className="w-7 h-7 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                </svg>
            </a>

            {/* Zalo button - below */}
            <a
                href={getZaloUrl(hotline)}
                target="_blank"
                rel="noopener noreferrer"
                className="floating-contact-btn zalo overflow-hidden"
                title="Chat Zalo"
                aria-label="Nhắn tin Zalo"
            >
                <Image
                    src="/zalo.svg"
                    alt="Zalo"
                    width={56}
                    height={56}
                    className="w-full h-full"
                />
            </a>
        </div>
    );
}
