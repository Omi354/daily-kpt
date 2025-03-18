# == Schema Information
#
# Table name: kpts
#
#  id         :bigint           not null, primary key
#  date       :date             not null
#  keep       :text(65535)
#  problem    :text(65535)
#  try        :text(65535)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :bigint
#
# Indexes
#
#  index_kpts_on_user_id           (user_id)
#  index_kpts_on_user_id_and_date  (user_id,date) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
class Kpt < ApplicationRecord
  belongs_to :user
end
