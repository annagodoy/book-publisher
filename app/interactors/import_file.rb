require 'csv'

class ImportFile
  include Interactor

  def call
    raise 'tipo de importação não pode ser vazio' if context.klass.blank?
    raise 'arquivo não pode ser vazio' if context.file.blank?

    csv.each_with_index do |row, index|
      next if index == 0
      
      headers = csv.first
      data    = {}

      headers.each_with_index do |header, index|
        data[header] = row[index]
      end
      
      obj = context.klass.new(data)
      obj.save
    end

  rescue => e
    context.fail!(error: e.message)
  end

  private 

  def csv
    @csv ||= CSV.parse(File.open(context.file), col_sep: ",")
  end

end