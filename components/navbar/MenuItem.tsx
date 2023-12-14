'use client';

interface MenuItemProps {
    onClick: () => void;
    label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ onClick, label }) => {

    let fontClass = "";
    if( label == "Logout" || label == "Sign up"){
        fontClass = "font-bold"
    }else{
        fontClass = "font-semibold"
    }

    return ( 
        <div onClick={onClick} className={`px-4 py-3 hover:bg-rose-400 hover:text-white transition ${fontClass}`}>
            {label}
        </div>
    );
}
 
export default MenuItem;