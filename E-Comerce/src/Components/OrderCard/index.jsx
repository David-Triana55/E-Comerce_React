import { TrashIcon } from "@heroicons/react/24/solid"


const OrderCard = ({id,title, imageUrl, price, handleDelete}) =>{

    let renderXmarkIcon

    if(handleDelete)  {
        renderXmarkIcon = <TrashIcon onClick={() => handleDelete(id)}   className="h-6 w-6 text-black cursor-pointer mx-1"/>
    }

    return (
        <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
                <figure className="w-20 h-20">
                    <img className="w-full h-full rounded-lg object-cover" src={imageUrl} alt={title} />
                </figure>
                <p className="text-sm font-light">{title}</p>
            </div>



            <div className="flex items-center">
                <p className="text-lg font-medium">{price}</p>
                {renderXmarkIcon}
            </div>

        </div>
    )
}

export default OrderCard