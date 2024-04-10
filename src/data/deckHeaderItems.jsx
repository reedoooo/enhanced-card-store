export const deckHeaderItems = (collection) => [
  {
    icon: 'collections',
    label: 'Portfolio Selected',
    value: collection?.name || 'Select a collection to view its statistics',
    delay: 0,
  },
  {
    icon: 'attach_money',
    label: 'Total Value',
    value:
      collection?.totalPrice || 'Select a collection to view its statistics',
    delay: 200,
  },
  {
    icon: 'format_list_numbered',
    label: 'Number of Unique Cards',
    value:
      collection?.cards?.length || 'Select a collection to view its statistics',
    delay: 400,
  },
  {
    icon: 'trending_up',
    label: "Today's Performance",
    value:
      collection?.statistics?.percentChange ||
      'Select a collection to view its statistics',
    delay: 600,
  },
];
