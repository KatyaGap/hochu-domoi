module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Posts', [
      {
        text: 'text1',
        pet_id: 1,
        type_id: 1,
        status_id: 1,
        breed_id: 1,
        color_id: 1,
        size: 1,
        lost_date: '2022-01-17T04:33:12.000Z',
        address_string: 'Address1',
        address_lattitude: 55.710022,
        address_longitude: 37.595869,
        photo_url: 'url1',
        user_id: 1,
      },
      {
        text: 'text2',
        pet_id: 1,
        type_id: 1,
        status_id: 2,
        breed_id: 2,
        color_id: 2,
        size: 2,
        lost_date: '2021-01-17T04:33:12.000Z',
        address_string: 'Address2',
        address_lattitude: 55.75191195440088,
        address_longitude: 37.56651525878905,
        photo_url: 'url2',
        user_id: 2,
      },
      {
        text: 'text3',
        pet_id: 1,
        type_id: 2,
        status_id: 3,
        breed_id: 3,
        color_id: 3,
        size: 3,
        lost_date: '2020-01-17T04:33:12.000Z',
        address_string: 'Address3',
        address_lattitude: 55.683986493805385,
        address_longitude: 37.534586242675786,
        photo_url: 'url3',
        user_id: 3,
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Posts', null, {});
  },
};
