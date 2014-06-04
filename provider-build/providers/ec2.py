from libcloud.compute.types import Provider
from libcloud.compute.providers import get_driver

cls = get_driver(Provider.EC2)

def get(**kwargs):
    '''
    Extract digital ocean data from the API
    '''
    client_id = kwargs.get('client_id')
    api_key = kwargs.get('api_key')

    if not client_id or not api_key:
        raise RuntimeError('Missing client_id or api_key')

    # Prepare API client
    driver = cls(client_id, api_key)

    # images = _get_images()
    sizes = _get_sizes(driver)
    locations = _get_locations(driver)

    results = {
        # 'images': images,
        'sizes': sizes,
        'locations': locations
    }
    return results


# def _get_images():
#     '''
#     Get all the available images
#     '''
#     # Need to extract from http://cloud-images.ubuntu.com/releases/
#     results = []
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
    # list location in lobcloud returns the inner location for each availability zone ...
    # https://libcloud.readthedocs.org/en/latest/compute/drivers/ec2.html
    # Hardcoding the root regions for now.

    results = [
        {
            'id': 'us-east-1',
            'name': 'US East (Northern Virginia)',
            'country': 'US'
        },
        {
            'id': 'us-west-1',
            'name': 'US West (Oregon)',
            'country': 'US'
        },
        {
            'id': 'us-west-2',
            'name': 'US West (Northern California)',
            'country': 'US'
        },
        {
            'id': 'eu-west-1',
            'name': 'EU (Ireland)',
            'country': 'Ireland'
        },
        {
            'id': 'ap-southeast-1',
            'name': 'Asia Pacific (Singapore)',
            'country': 'Singapore'
        },
        {
            'id': 'ap-southeast-2',
            'name': 'Asia Pacific (Sydney)',
            'country': 'Australia'
        },
        {
            'id': 'ap-northeast-1',
            'name': 'Asia Pacific (Tokyo)',
            'country': 'Japan'
        },
        {
            'id': 'sa-east-1',
            'name': 'South America (Sao Paulo)',
            'country': 'Brazil'
        }
    ]
    return results

