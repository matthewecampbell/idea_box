json.extract! idea, :title, :body, :quality, :updated_at, :created_at, :id


json.array!(@ideas) do |json, idea|
  json.(idea, :title, :body, :quality, :updated_at, :created_at, :id)
  json.tags lender.inventories do |json, inventory|
    json.(inventory, :id, :itemlist_id, :description)
  end
end
