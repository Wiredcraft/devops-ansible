from libcloud.compute.types import Provider
from libcloud.compute.providers import get_driver

cls = get_driver(Provider.DIGITAL_OCEAN)

def get(**kwargs):
    '''
    Extract data from the API
    '''
    client_id = kwargs.get('client_id')
    api_key = kwargs.get('api_key')

    if not client_id or not api_key:
        raise RuntimeError('Missing client_id or api_key')

    # Prepare API client
    driver = cls(client_id, api_key)

    # images = _get_images(driver)
    sizes = _get_sizes(driver)
    locations = _get_locations(driver)

    results = {
        # 'images': images,
        'sizes': sizes,
        'locations': locations
    }
    return results

# def _get_images(driver):
#     '''
#     Get all the available images
#     '''
#     results = []
#     images = driver.list_images()
#     for img in images:
#         if img.name.startswith('Ubuntu'):
#             results.append({
#                 'id': img.id,
#                 'name': img.name
#             })
#     return results

def _get_sizes(driver):
    '''
    Get all the avilable sizes
    '''
    results = []
    sizes = driver.list_sizes()
    for size in sizes:
        results.append({
            'id': size.id,
            'name': size.name,
            'bandwidth': size.bandwidth,
            'disk': size.disk,
            'price': size.price,
            'price_per': 'hour',
            'ram': size.ram 
        })
    return results

def _get_locations(driver):
    '''
    Get all the available locations
    '''
    results = []
    locations = driver.list_locations()
    for location in locations:
        results.append({
            'id': location.id,
            'name': location.name,
            'country': location.country
        })
    return results
