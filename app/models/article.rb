# == Schema Information
#
# Table name: articles
#
#  id          :bigint           not null, primary key
#  caption     :text             not null
#  likes_count :integer          default(0), not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  user_id     :bigint           not null
#
# Indexes
#
#  index_articles_on_user_id  (user_id)
#
class Article < ApplicationRecord
    belongs_to :user
    has_many_attached :images, dependent: :destroy
    has_many :likes, dependent: :destroy
    has_many :comments, dependent: :destroy
end
