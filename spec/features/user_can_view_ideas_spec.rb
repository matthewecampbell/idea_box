require "rails_helper"

feature "User visits home page" do
  scenario "They fill in the form and create and idea" do

    visit "/"

    expect(page).to have_content("Latest Ideas")
    expect(page).to have_content("Fetch Ideas")
    expect(page).to have_content("Sort")
    expect(page).to have_content("Title")
    expect(page).to have_content("Body")
  end
end
