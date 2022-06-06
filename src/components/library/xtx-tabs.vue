<script>
export default {
  name: 'xtxTabs',
  render () {
    const panels = this.$slots.default()

    const dynamicPanels = []
    panels.forEach((item) => {
      if (item.type.name === 'xtxTabsPanel') {
        dynamicPanels.push(item)
      } else {
        item.children.forEach((item) => {
          dynamicPanels.push(item)
        })
      }
    })

    const nav = (
      <nav>
        {dynamicPanels.map((item, i) => {
          return <a href="">{item.props.label}</a>
        })}
      </nav>
    )

    return <div class="xtx-tabs">{[nav, dynamicPanels]}</div>
  }
}
</script>

<style lang="less" scoped>
.xtx-tabs {
  background: #fff;
  > nav {
    height: 60px;
    line-height: 60px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;
    > a {
      width: 110px;
      border-right: 1px solid #f5f5f5;
      text-align: center;
      font-size: 16px;
      &.active {
        border-top: 2px solid @xtxColor;
        height: 60px;
        background: #fff;
        line-height: 56px;
      }
    }
  }
}
</style>
