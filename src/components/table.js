import React, { useState } from "react";
import { Table , Button, Modal, Text } from '@bigcommerce/big-design';
import data from './data';
import axios from 'axios';

function TableProducts() {
    const [isOpen, setIsOpen] = useState(false);
    const [imageValue, setImageValue] = useState('');
    const [priceValue, setPriceValue] = useState('');
    const [descValue, setDescValue] = useState('');
    const [serverData, setserverData] = useState('');

    const openModal = (data) => (
        <Button
          variant="subtle"
          actionType="destructive"
          onClick={() => {
              setIsOpen(true),
              setImageValue(data.primary_image),
              setPriceValue(data.price),
              setDescValue(data.description)
          }}
        >Show product</Button>
    );

    async function renderPosts() {
        const queryParams = new URLSearchParams(window.location.search);
        const token = queryParams.get('signed_payload_jwt');

        if (token) {
            const res = await axios.get(`https://a6f2-87-255-31-28.ngrok.io?token=${token}`);
            const products = res.data;
            const cutProducts =  products.replace('<div>','').replace('</div>','').replaceAll('&quot;',`"`);
            const finalData = JSON.parse(cutProducts);
            setserverData(finalData);
        }
    };

    renderPosts();

    return (
        <div>
            <Table
                columns={[
                    { header: 'Id', hash: 'id', render: ({ id }) => id },
                    { header: 'Name', hash: 'name', render: ({ name }) => name },
                    { header: 'Category', hash: 'category', render: ({ categories }) => categories.toString() },
                    { header: 'Stock', hash: 'stock', render: ({ inventory_level }) => inventory_level },
                    { header: '', align: 'right', hash: 'actions', render: openModal },
                ]}
                items={serverData ? serverData : data}
            />
            <Modal
                actions={[
                    { text: 'Close', onClick: () => setIsOpen(false) },
                ]}
                header="Product information"
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                closeOnEscKey={true}
                closeOnClickOutside={false}
            >
                <img src={ imageValue } />
                <Text>Price: { priceValue }</Text>
                <Text>Description: { descValue }</Text>
            </Modal>
        </div>
    );
}

export default TableProducts;
