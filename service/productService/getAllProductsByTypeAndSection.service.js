const db = require('../../dataBase').getInstance();
const {
    DB_TABLE_NAME: {PRODUCT, PRODUCT_TYPE, PRODUCT_STATUS, PRODUCT_SIZE, PRODUCT_SECTION},
} = require('../../constants');

module.exports = async (type_id, section_id, limit, offset) => {
    const ProductModel = await db.getModel(PRODUCT);

    const ProductTypeModel = await db.getModel(PRODUCT_TYPE);
    const ProductStatusModel = await db.getModel(PRODUCT_STATUS);
    const ProductSizeModel = await db.getModel(PRODUCT_SIZE);
    const ProductSectionsModel = await db.getModel(PRODUCT_SECTION);

    return ProductModel.findAll({
        where: {type_id, section_id},
        include: [
            {
                model: ProductTypeModel,
                attributes: ['type']
            },
            {
                model: ProductStatusModel,
                attributes: ['status']
            },
            {
                model: ProductSizeModel,
                attributes: ['size']
            },
            {
                model: ProductSectionsModel,
                attributes: ['section']
            }
        ],
        raw: true,
        order: [
            ['productId', 'DESC']
        ]
    });
};

