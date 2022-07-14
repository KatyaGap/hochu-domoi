module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Images', [
      {
        image: '/images/чихуахуа1.jpeg',
        post_id: 1,
      },
      {
        image: '/images/чихуахуа2.jpeg',
        post_id: 1,
      },
      {
        image: '/images/чихуахуа3.jpeg',
        post_id: 2,
      },
      {
        image: '/images/чихуахуа4.jpeg',
        post_id: 2,
      },
      {
        image: '/images/чихуахуа5.jpeg',
        post_id: 3,
      },
      {
        image: '/images/чихуахуа6.jpeg',
        post_id: 4,
      },
      {
        image: '/images/чихуахуа7.jpeg',
        post_id: 4,
      },
      {
        image: '/images/чихуахуа8.jpeg',
        post_id: 5,
      },
      {
        image: '/images/чихуахуа9.jpeg',
        post_id: 5,
      },
      {
        image: '/images/чихуахуа10.jpeg',
        post_id: 5,
      },
      {
        image: '/images/бультерьер1.jpeg',
        post_id: 6,
      },
      {
        image: '/images/бультерьер2.jpeg',
        post_id: 7,
      },
      {
        image: '/images/бультерьер3.jpeg',
        post_id: 8,
      },
      {
        image: '/images/чаучау1.jpeg',
        post_id: 9,
      },
      {
        image: '/images/чаучау2.jpeg',
        post_id: 10,
      },
      {
        image: '/images/чаучау3.jpeg',
        post_id: 11,
      },
      {
        image: '/images/чаучау4.jpeg',
        post_id: 12,
      },
      {
        image: '/images/кошка1.jpeg',
        post_id: 13,
      },
      {
        image: '/images/кошка2.jpeg',
        post_id: 13,
      },
      {
        image: '/images/крыса1.jpeg',
        post_id: 14,
      },
      {
        image: '/images/крыса2.jpeg',
        post_id: 14,
      },
      {
        image: '/images/хомяк1.jpeg',
        post_id: 15,
      },
      {
        image: '/images/хомяк2.jpeg',
        post_id: 15,
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Images', null, {});
  },
};
