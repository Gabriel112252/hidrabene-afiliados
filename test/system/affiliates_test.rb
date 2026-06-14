require "application_system_test_case"

class AffiliatesTest < ApplicationSystemTestCase
  setup do
    @affiliate = affiliates(:one)
  end

  test "visiting the index" do
    visit affiliates_url
    assert_selector "h1", text: "Affiliates"
  end

  test "should create affiliate" do
    visit affiliates_url
    click_on "New affiliate"

    fill_in "Accepted at", with: @affiliate.accepted_at
    check "Accepted image use" if @affiliate.accepted_image_use
    fill_in "Cep", with: @affiliate.cep
    fill_in "City", with: @affiliate.city
    fill_in "Complement", with: @affiliate.complement
    fill_in "Cpf", with: @affiliate.cpf
    fill_in "Email", with: @affiliate.email
    fill_in "Name", with: @affiliate.name
    fill_in "Neighborhood", with: @affiliate.neighborhood
    fill_in "Number", with: @affiliate.number
    fill_in "Signature name", with: @affiliate.signature_name
    fill_in "State", with: @affiliate.state
    fill_in "Street", with: @affiliate.street
    fill_in "Whatsapp", with: @affiliate.whatsapp
    click_on "Create Affiliate"

    assert_text "Affiliate was successfully created"
    click_on "Back"
  end

  test "should update Affiliate" do
    visit affiliate_url(@affiliate)
    click_on "Edit this affiliate", match: :first

    fill_in "Accepted at", with: @affiliate.accepted_at.to_s
    check "Accepted image use" if @affiliate.accepted_image_use
    fill_in "Cep", with: @affiliate.cep
    fill_in "City", with: @affiliate.city
    fill_in "Complement", with: @affiliate.complement
    fill_in "Cpf", with: @affiliate.cpf
    fill_in "Email", with: @affiliate.email
    fill_in "Name", with: @affiliate.name
    fill_in "Neighborhood", with: @affiliate.neighborhood
    fill_in "Number", with: @affiliate.number
    fill_in "Signature name", with: @affiliate.signature_name
    fill_in "State", with: @affiliate.state
    fill_in "Street", with: @affiliate.street
    fill_in "Whatsapp", with: @affiliate.whatsapp
    click_on "Update Affiliate"

    assert_text "Affiliate was successfully updated"
    click_on "Back"
  end

  test "should destroy Affiliate" do
    visit affiliate_url(@affiliate)
    accept_confirm { click_on "Destroy this affiliate", match: :first }

    assert_text "Affiliate was successfully destroyed"
  end
end
