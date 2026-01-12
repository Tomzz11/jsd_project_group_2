export default function CartHeader({allChecked, onToggle}) {
    return(
        <div className="flex items-center gap-4 px-6 py-3 bg-slate-100 border-b text-sm font-semibold">
            <input 
                type="checkbox"
                checked={allChecked}
                onChange={onToggle} 
            />
        
            <div className="flex-1">Products</div>
            <div className="w-24 text-center">Price</div>
            <div className="w-32 text-center">Quanlity</div>
            <div className="w-20 text-center">Delete</div>
        </div>
    );
}