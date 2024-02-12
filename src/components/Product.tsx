type ProductProps = {
    product: {
        ProductID: number,
        ProductName: string,
        Model: string,
        Manufacturer: string,
        Description: string,
        Price: number,
        WarrantyDetails: string,
        Availability: {
            type: string,
            enum: ['Available', 'Out of Stock'],
            default: 'Available'
        };
    };
};

const Product = ({ product }: ProductProps) => {
    return (
        <div>
            <h3>
                {product.ProductID} - {product.ProductName}

                
            </h3>
        </div>
    );
}

export default Product;
