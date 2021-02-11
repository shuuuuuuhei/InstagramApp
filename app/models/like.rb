# == Schema Information
#
# Table name: likes
#
#  id          :bigint           not null, primary key
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  articles_id :bigint           not null
#  user_id     :bigint           not null
#
# Indexes
#
#  index_likes_on_articles_id  (articles_id)
#  index_likes_on_user_id      (user_id)
#
class Like < ApplicationRecord
    belong_to :user
    belong_to :article
end
