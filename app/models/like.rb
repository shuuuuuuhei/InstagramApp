# == Schema Information
#
# Table name: likes
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  article_id :bigint           not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_likes_on_article_id  (article_id)
#  index_likes_on_user_id     (user_id)
#
class Like < ApplicationRecord
    belongs_to :user
    belongs_to :article

    def display_user_name(user_id)
        put 'aaaa'
    end
    
end
