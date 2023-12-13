import Image from "next/image";

export default function NewsComm({com,col}) {
    return (
        <div>
            <div className="p-3 speech-bubble full_rounded" dangerouslySetInnerHTML={{__html: com.content.rendered}}></div>
            <span className="red_text com_author"><Image alt="" width={96} height={96} className="mt-2 round_cube" src={com.author_avatar_urls['96']} /><b>{com.author_name}</b></span>
            
            
        </div>
    )
}
