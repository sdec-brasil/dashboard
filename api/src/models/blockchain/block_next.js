export default function (sequelize, DataTypes) {
  const blockNext = sequelize.define('block_next', {
    block_id: {
      type: DataTypes.DECIMAL(14, 0),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'block',
        key: 'block_id',
      },
    },
    next_block_id: {
      type: DataTypes.DECIMAL(14, 0),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'block',
        key: 'block_id',
      },
    },
  }, {
    tableName: 'block_next',
    freezeTableName: true,
    timestamps: false,
  });
  return blockNext;
}
