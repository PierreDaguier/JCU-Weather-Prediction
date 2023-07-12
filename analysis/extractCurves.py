from pdf2image import convert_from_path

# convert all pages in the PDF to images
images = convert_from_path('output.pdf')

# save each image
for i, image in enumerate(images):
    image.save('./curves/curve_{}.png'.format(i), 'PNG')
