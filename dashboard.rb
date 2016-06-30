require 'sinatra'
require 'intercom'
require 'dotenv'

Dotenv.load

INTERCOM_API_KEY = ENV.fetch('INTERCOM_API_KEY') { raise "INTERCOM_API_KEY environment variable required" }
INTERCOM_APP_ID = ENV.fetch('INTERCOM_APP_ID') { raise "INTERCOM_APP_ID environment variable required" }
INTERCOM_SEGMENT = ENV.fetch('INTERCOM_SEGMENT') { raise "INTERCOM_SEGMENT environment variable required" }

get '/' do
  erb :index
end

get '/count' do
  puts @intercom_app_id
  intercom = Intercom::Client.new(app_id: INTERCOM_APP_ID, api_key: INTERCOM_API_KEY)
  counts = intercom.counts.for_type(type: 'user', count: 'segment')
  segment = counts.user['segment'].find { |s| s[INTERCOM_SEGMENT] != nil }
  count = segment[INTERCOM_SEGMENT]

  content_type :json
  { count: count }.to_json
end
